import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';

const showOnScroll = modifier(function showOnScroll(element) {
  function toggleVisibility() {
    if (window.scrollY > window.innerHeight) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  }

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);

  return () => {
    window.removeEventListener('scroll', toggleVisibility);
  };
});

function scrollToTopOfPageOnClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

<template>
  <button
    type='button'
    {{showOnScroll}}
    {{on 'click' scrollToTopOfPageOnClick}}
    class='scroll-to-top'
    alt='Scroll to top'
  ></button>
</template>
