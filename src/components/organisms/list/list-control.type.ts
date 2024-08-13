export type ListControlProps<T> = {
  asRoute?: boolean
  onSelect?: (value: T) => void
  canCreate?: boolean
}
