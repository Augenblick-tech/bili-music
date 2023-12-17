export interface MenuListItem {
	name: string
	key: string
	icon?: string
	path: MenuListPath
}

export interface MenuList {
	isFoldable: boolean
	isFolded?: boolean
	key: string
	list: MenuListItem[]
}

export type MenuListPath =
	| 'pickup'
	| 'collection'
	| 'podcast'
	| 'private'
	| 'community'
	| 'like'
	| 'recent'
	| 'myPodcast'
	| 'myCollection'
