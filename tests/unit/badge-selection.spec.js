/*eslint-env node, jest */
import { getMountedComponent, zenTags } from '../helpers'
import BadgeSelectionComponent from '../../src/components/BadgeSelection.vue'

const BADGES = [
    {
        "_id": "5edd55d28c4f8ae6ac6032d7",
        "text": "Tutorial",
        "description": "Any post that is a tutorial",
        "color": "deeppink",
        "createdAt": new Date("2020-06-07T21:02:10.409Z"),
        "updatedAt": new Date("2020-06-07T21:02:10.409Z"),
        "__v": 0
    },
    {
        "_id": "5edd56108c4f8ae6ac6032d8",
        "text": "Highlight",
        "description": "Artist highlight post",
        "color": "lime",
        "createdAt": new Date("2020-06-07T21:03:12.830Z"),
        "updatedAt": new Date("2020-06-07T21:03:12.830Z"),
        "__v": 0
    },
    {
        "_id": "5eded509311ac720da1bb9f0",
        "text": "Announcement",
        "description": "Posts that are announcements",
        "color": "yellow",
        "createdAt": new Date("2020-06-09T00:17:13.639Z"),
        "updatedAt": new Date("2020-06-09T00:17:13.639Z"),
        "__v": 0
    }
]

describe('Component | Badge Selection', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(
            BadgeSelectionComponent, 
            zenTags, 
            {
                items: [],
                selection: [],
                flexBasis: '50%'
            }
        )
    })
    it('renders correct amount of badges', () => {
        component.setProps(
            {
                items: BADGES,
                selection: [],
                flexBasis: '50%'
            }
        )
        component.vm.$nextTick(() => {
            const badges = component.findAll('.tag')

            expect(
                badges.length
            ).toBe(BADGES.length)
        })
    })
    
    it('Correctly mark enabled badge', () => {
        component.setProps(
            {
                items: BADGES,
                selection: [BADGES[0]],
                flexBasis: '50%'
            }
        )
        component.vm.$nextTick(() => {
            expect(
                component.vm.enabled(BADGES[0])
            ).toBeTruthy()
        })
    })
})