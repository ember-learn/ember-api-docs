import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('api-index', 'Integration | Component | api index', {
  integration: true
});

// test('should display api index', function(assert) {
//   let model = Ember.Object.create({
//     project: {
//       id: 'lolwut'
//     },
//     projectVersion: {
//       version: '2.9'
//     },
//     name: 'hai',
//     methods: [
//       {
//         name: 'doSomething',
//         route: 'do-something'
//       }
//     ],
//     properties: [
//       {
//         name: 'isSomething',
//         route: 'is-something'
//       }
//     ],
//     events: [
//       {
//         name: 'didSomething',
//         route: 'did-something'
//       }
//     ]
//   });
//   this.set('myModel', model);

//   // Template block usage:
//   this.render(hbs`
//       {{#api-index itemData=myModel as |sectionData|}}
//         <section>
//           Show:
//           <label class="access-checkbox">
//             <input id=\"inherited-toggle\"
//                    type=\"checkbox\"
//                    checked={{showInherited}}
//                    onchange={{action (mut showInherited) value=\"target.checked\"}}>
//             Inherited
//           </label>
//           <label class="access-checkbox">
//             <input id=\"protected-toggle\"
//                    type=\"checkbox\"
//                    checked={{showProtected}}
//                    onchange={{action (mut showProtected) value=\"target.checked\"}}>
//             Protected
//           </label>
//           <label class="access-checkbox">
//             <input id=\"private-toggle\"
//                    type=\"checkbox\"
//                    checked={{showPrivate}}
//                    onchange={{action (mut showPrivate) value=\"target.checked\"}}>
//             Private
//           </label>
//           <label class="access-checkbox">
//             <input id=\"deprecated-toggle\"
//                    type=\"checkbox\"
//                    checked={{showDeprecated}}
//                    onchange={{action (mut showDeprecated) value=\"target.checked\"}}>
//             Deprecated
//           </label>
//         </section>

//         {{#each sectionData.sections as |section|}}
//           <h2>{{section.title}}</h2>
//           {{#if section.items}}
//             <ul class=\"{{item.class}}\"
//               {{#each section.items as |item|}}
//                 <li>
//                   {{#link-to \"item.route\"
//                              sectionData.projectId
//                              sectionData.projectVersion
//                              sectionData.name
//                              item.name
//                              (query-params anchor=item.name)}}
//                     {{item.name}}
//                   {{/link-to}}
//                 </li>
//               {{/each}}
//             </ul>
//             {{else}}
//               No documented items
//           {{/if}}
//         {{/each}}
//       {{/api-index}}
//   `);


// });
