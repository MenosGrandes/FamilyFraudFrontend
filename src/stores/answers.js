import { derived, writable } from 'svelte/store'
import { get } from 'svelte/store'

export const answers = writable([])
export const visiblePoints = derived(answers, ($answers) => get(answers).reduce((acc, x) => acc + (x.isVisible ? x.points : 0), 0));

