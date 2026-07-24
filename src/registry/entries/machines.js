export const machineEntries = [
  {
    key: 'machine',
    endpoint: 'machine',
    cluster: 'machines',
    label: 'Machine',
    pluralLabel: 'Machines',
    icon: 'mdi:disc',
    color: 'type-steel',
    description: 'A TM/HM/TR and the move it teaches in a given version group.',
    primaryIdentifier: 'id',
    listFields: [
      { key: 'id', label: 'ID', kind: 'text', showInList: true },
      { key: 'item', label: 'Item', kind: 'link', linkResourceType: 'item', showInList: true },
      { key: 'move', label: 'Move', kind: 'link', linkResourceType: 'move', showInList: true },
    ],
    detailFields: [
      { key: 'item', label: 'Item', kind: 'link', linkResourceType: 'item', showInDetail: true },
      { key: 'move', label: 'Move', kind: 'link', linkResourceType: 'move', showInDetail: true },
      { key: 'version_group', label: 'Version Group', kind: 'link', linkResourceType: 'version-group', showInDetail: true },
    ],
  },
]
