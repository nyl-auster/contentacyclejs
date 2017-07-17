import { div, h1, h2, p, label, ul, li, input, hr, a } from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  let recipesRequest$ = xs.of({
    url: 'https://dev-contentacms.pantheonsite.io/api/recipes', // GET method by default
    category: 'recipes',
  });

  let response$ = sources.HTTP
    .select('recipes')
    .flatten()
    .map(response => response.body.data)
    .startWith([])

  let vdom$ = response$
    .map(results =>
      div('.recipes-list', results.map(result =>
        div('.recipe', [
          h2(result.attributes.title),
          p(result.attributes.ingredients)
        ])
      ))  
    )

  const sinks = {
    DOM: vdom$,
    HTTP: recipesRequest$
  }
  return sinks
}
