/*eslint-env node, jest */
import { getMountedComponent } from '../../helpers'
import BadgeComponent from '../../../src/components/Badge.vue'

describe('Component | Badge', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(BadgeComponent, [], {
            text: 'Default',
            color: 'red',
            disabled: false,
            btn: false,
            button: false
        })
    })
    it('renders proper style object', () => {
        const style = {
            'background-color': 'red',
            'opacity': 1,
            'color': 'black'
        }
        expect(
            component.vm.style
        ).toStrictEqual(style);
    })
})