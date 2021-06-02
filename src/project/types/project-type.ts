/*
* project-type.ts
*
* Copyright (C) 2020 by RStudio, PBC
*
*/

import { PandocFlags } from "../../config/flags.ts";
import { Format, FormatExtras } from "../../config/format.ts";
import { Metadata } from "../../config/metadata.ts";

import { PandocRenderer, RenderOptions } from "../../command/render/render.ts";
import { PandocOptions } from "../../command/render/pandoc.ts";

import { ProjectConfig, ProjectContext } from "../project-context.ts";

export interface ProjectType {
  type: string;
  create: (title: string) => ProjectCreate;
  config?: (
    projectDir: string,
    config: ProjectConfig,
  ) => Promise<ProjectConfig>;
  libDir?: string;
  outputDir?: string;
  formatLibDirs?: () => string[];
  formatExtras?: (
    context: ProjectContext,
    input: string,
    flags: PandocFlags,
    format: Format,
  ) => Promise<FormatExtras>;
  projectFormatsOnly?: boolean;
  isSupportedFormat?: (format: Format) => boolean;
  metadataFields?: () => Array<string | RegExp>;
  filterParams?: (options: PandocOptions) => Metadata | undefined;
  resourceIgnoreFields?: () => string[];
  navItemText?: (
    context: ProjectContext,
    input: string,
    text: string,
  ) => Promise<string>;
  incrementalRenderAll?: (
    context: ProjectContext,
    options: RenderOptions,
    files: string[],
  ) => Promise<boolean>;
  preRender?: (context: ProjectContext) => Promise<void>;
  pandocRenderer?: (
    options: RenderOptions,
    context: ProjectContext,
  ) => PandocRenderer;
  postRender?: (
    context: ProjectContext,
    incremental: boolean,
    outputFiles: ProjectOutputFile[],
  ) => Promise<void>;
}

export interface ProjectOutputFile {
  file: string;
  format: Format;
}

export interface ProjectCreate {
  configTemplate: string;
  resourceDir: string;
  scaffold?: ProjectScaffoldFile[];
  supporting?: string[];
}

export interface ProjectScaffoldFile {
  name: string;
  content: string;
  title?: string;
}