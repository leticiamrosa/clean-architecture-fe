export default interface SetStorage {
  set: (key: string, value: any) => Promise<void>
}
