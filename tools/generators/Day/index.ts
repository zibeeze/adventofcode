import {
  convertNxGenerator,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  toJS,
  Tree,
  updateProjectConfiguration,
  updateTsConfigsToJs,
} from '@nrwl/devkit';

import { Schema } from './schema';
import { libraryGenerator as workspaceLibraryGenerator } from '@nrwl/workspace/generators';
import { join } from 'path';

export interface NormalizedSchema extends Schema {
  name: string;
  prefix: string;
  fileName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export async function libraryGenerator(tree: Tree, schema: any) {
  schema.name = schema.day.toString();
  schema.directory = schema.year.toString();
  schema.simpleModuleName = false;
  schema.linter = 'eslint';
  schema.unitTestRunner = 'jest';
  schema.skipFormat = false;
  schema.skipTsConfig = false;
  schema.buildable = false;
  schema.testEnvironment = 'jsdom';
  schema.babelJest = false;
  schema.pascalCaseFiles = false;
  schema.js = false;
  schema.strict = false;
  schema.setParserOptionsProject = false;
  const options = normalizeOptions(tree, schema);

  if (options.publishable === true && !schema.importPath) {
    throw new Error(
      `For publishable libs you have to provide a proper "--importPath" which needs to be a valid npm package name (e.g. my-awesome-lib or @myorg/my-lib)`
    );
  }

  const libraryInstall = await workspaceLibraryGenerator(tree, {
    ...schema,
    importPath: options.importPath,
    testEnvironment: 'node',
    skipFormat: true,
    setParserOptionsProject: options.setParserOptionsProject,
  });
  createFiles(tree, options);

  if (options.js) {
    updateTsConfigsToJs(tree, options);
  }
  updateProject(tree, options);

  if (!schema.skipFormat) {
    await formatFiles(tree);
  }

  return libraryInstall;
}

export default libraryGenerator;
export const librarySchematic = convertNxGenerator(libraryGenerator);

function normalizeOptions(tree: Tree, options: any): NormalizedSchema {
  console.log(options);
  const { npmScope, libsDir } = getWorkspaceLayout(tree);
  const defaultPrefix = npmScope;
  const name = options.name;
  console.log({ name });
  const projectDirectory = `${options.directory}/${options.name}`;
  console.log({ projectDirectory });
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  console.log({ projectName });
  const fileName = projectName;
  console.log({ fileName });
  const projectRoot = joinPathFragments(libsDir, projectDirectory);
  console.log({ projectRoot });
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  console.log({ parsedTags });

  const importPath =
    options.importPath || `@${defaultPrefix}/${projectDirectory}`;
  console.log({ importPath });

  return {
    ...options,
    prefix: defaultPrefix, // we could also allow customizing this
    fileName,
    name: projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    importPath,
    day: name,
    year: options.directory,
  };
}

// function getCaseAwareFileName(options: {
//   pascalCaseFiles: boolean;
//   fileName: string;
// }) {
//   const normalized = names(options.fileName);

//   return options.pascalCaseFiles ? normalized.className : normalized.fileName;
// }

function createFiles(tree: Tree, options: NormalizedSchema) {
  const { className, name, propertyName } = names(options.fileName);

  generateFiles(tree, join(__dirname, './files/lib'), options.projectRoot, {
    ...options,
    className,
    name,
    propertyName,
    tmpl: '',
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  });

  if (options.unitTestRunner === 'none') {
    tree.delete(
      join(options.projectRoot, `./src/lib/${options.fileName}.spec.ts`)
    );
  }
  if (!options.publishable && !options.buildable) {
    tree.delete(join(options.projectRoot, 'package.json'));
  }
  if (options.js) {
    toJS(tree);
  }
}

function updateProject(tree: Tree, options: any) {
  if (!options.publishable && !options.buildable) {
    return;
  }

  const project = readProjectConfiguration(tree, options.name);
  const { libsDir } = getWorkspaceLayout(tree);

  project.targets = project.targets || {};
  project.targets.build = {
    executor: '@nrwl/node:package',
    outputs: ['{options.outputPath}'],
    options: {
      outputPath: `dist/${libsDir}/${options.projectDirectory}`,
      tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
      packageJson: `${options.projectRoot}/package.json`,
      main: `${options.projectRoot}/src/index` + (options.js ? '.js' : '.ts'),
      assets: [`${options.projectRoot}/*.md`],
    },
  };

  project.targets.input = {
    executor: '@nrwl/workspace:run-commands',
    options: {
      commands: [
        `node ./tools/scripts/get-proble-input.js --day=${options.name} --year=${options.directory}`,
      ],
      parallel: false,
    },
  };

  console.log(project.targets.input);

  if (options.rootDir) {
    project.targets.build.options.srcRootForCompilationRoot = options.rootDir;
  }

  updateProjectConfiguration(tree, options.name, project);
}
