function getHead() {
  return document.head;
}

<template>
  {{#in-element (getHead) insertBefore=null}}
    {{yield}}
  {{/in-element}}
</template>
