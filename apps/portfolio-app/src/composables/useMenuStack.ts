import { reactive } from 'vue'

export function useMenuStack() {
  const stack = reactive([]) // [{ title, items, anim }]
  const openRoot = (items, title = 'Menu') => {
    stack.splice(0, stack.length)
    stack.push({ title, items, anim: 'slide-in-right' })
  }
  const forward = (title, items) => {
    // animate old out, new in
    if (stack.length) stack[stack.length - 1].anim = 'slide-out-left'
    stack.push({ title, items, anim: 'slide-in-right' })
  }
  const back = () => {
    if (!stack.length) return
    // slide current out right
    stack[stack.length - 1].anim = 'slide-out-right'
    const t = setTimeout(() => {
      stack.pop()
      if (stack.length) stack[stack.length - 1].anim = 'slide-in-left'
      clearTimeout(t)
    }, 160)
  }
  const current = () => stack[stack.length - 1] || { title: 'Menu', items: [] }
  return { stack, openRoot, forward, back, current }
}
