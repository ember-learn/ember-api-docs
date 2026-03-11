import pageTitle from 'ember-page-title/helpers/page-title';
import EsSidebar from 'ember-styleguide/components/es-sidebar';
import TableOfProjects from 'ember-api-docs/components/table-of-projects';
import PowerSelect from 'ember-power-select/components/power-select';
import { fn } from '@ember/helper';
import TableOfContents from 'ember-api-docs/components/table-of-contents';
import versionLt from 'ember-api-docs/helpers/version-lt';
import ScrollToTopButton from 'ember-api-docs/components/scroll-to-top-button';
<template>
  {{pageTitle @model.version}}

  <div class="sidebar-container sidebar-container--full-width">
    <EsSidebar>
      <TableOfProjects @activeProject={{@controller.activeProject}} />

      <div class="select-container">
        <PowerSelect
          @onChange={{fn @controller.updateProject @controller.activeProject}}
          @options={{@controller.projectVersions}}
          @selected={{@controller.selectedProjectVersion}}
          @ariaLabel="Select a version"
          @required={{true}}
          @searchField="compactVersion"
          @searchEnabled={{true}}
          as |ver|
        >
          {{ver.compactVersion}}
        </PowerSelect>
      </div>

      <TableOfContents
        @version={{@controller.urlVersion}}
        @classesIDs={{@controller.shownClassesIDs}}
        @moduleIDs={{@controller.shownModuleIDs}}
        @namespaceIDs={{@controller.shownNamespaceIDs}}
        @showPrivateClasses={{@controller.showPrivateClasses}}
        @togglePrivateClasses={{@controller.togglePrivateClasses}}
        @isShowingNamespaces={{versionLt
          @controller.selectedProjectVersion.compactVersion
          "2.16"
        }}
      />
    </EsSidebar>
    <section class="content-wrapper">
      {{outlet}}

      {{#unless @controller.fastboot.isFastBoot}}
        <ScrollToTopButton />
      {{/unless}}
    </section>
  </div>
</template>
