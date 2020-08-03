/*eslint-env node, jest */
import { getMountedComponent, zenTags } from '../../helpers'
import CommentComponent from '../../../src/components/Comment.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const MOCK_COMMENT = {
    "_id": "5edc36e4bae2e9c2bd2dc0d7",
    "content": `oLsWi4P3rNGdfU3AEGdSqwgtXXrlkEZ0X8cReUgP7z4JQuERtwr6GXu0fLWA1UKKVLK1HGgDHOIMnSz4lRK28cyaL3euCii0LHumEjKrgUsxTBPTFrCTL1JLBxAMgKW5MQhEpE60H5wdmNUYixPkeVdMiNUDVYgqZ2P34Byx9IA1dcsY8yhF113r5ARDlb3EcR1g3p5ZReuTaZBjqGrigocX3LhzZZiVsaHl2IXMSJ7KYhjnyQWwEpza2PFtw9oDgO94SdwKna39r03pzd5FScI9IGceYKMjgpElvhxWUxFDDleLD440oLqw7hSvHhbfTz2RiAvyhhCBHIi7aCOn5uS4rNfizfLGnewHadyLZGMsXhdwZenVvT7lpdm8FpWttaV7RhkY1YVn1CUfweKmsDtQN4DX3gQIAKd8o8rsGsFlXLl5LKYftOq9ZCm5bCvhxZgs9TWcxEx8TE0QoS7C57pLqqPjNwLfBDpnMABBrkzocwyeKBiHruK3n75Ygcduhnd5UGrmbTOgdo5pwKWKofvzLG0iwgGLEiPjxvTePUjgmKkkvWfCilAFLA406Gn0mvOVx1o5Ufc07irBC4UsQwLNX`,
    "name": "Sedara Wood",
    "email": "sedaraks@gmail.com",
    "postId": "5ecdb8f24909067a938bb240",
    "updatedAt": new Date("2020-06-07T19:34:14.207Z"),
    "userId": "5edc24eb21856f9a57af16a8",
    "reported": false,
    "createdAt": new Date("2020-06-07T00:37:56.048Z"),
    "__v": 0
}
const DEFAULT_PROPS = {
    comment: MOCK_COMMENT,
    isUser: false
}

describe('Component | Comment', () => {
    let component;

    beforeEach(() => {
        component = getMountedComponent(CommentComponent, 
                zenTags, 
                DEFAULT_PROPS,
                {
                    mocks: {
                        $dayjs: dayjs
                    },
                    data () {
                        return {
                            viewMore: false
                        }
                    }
                })
    })
    it('renders proper sections', () => {

        // renders author values
        component.vm.$nextTick(() => {
            const author = component.find('.author')
            const pTags = author.findAll('.name')
            const name = pTags.at(0).text()
            expect(name).toBe(MOCK_COMMENT.name)
        })
    })

    it('can toggle view more button', () => {
        
        component.vm.$nextTick(() => {
            const viewMoreBtn = component.find('.view-more-btn')
            const contentStyleExpect = {
                overflow: 'hidden',
                maxHeight: '150px'
            }

            // view more btn exists
            expect(viewMoreBtn.exists()).toBeTruthy()

            // default styles is hidden, max height 150px
            expect(component.vm.contentStyles)
                .toStrictEqual(contentStyleExpect)

            contentStyleExpect.overflow = 'auto'
            contentStyleExpect.maxHeight = '300px'
            component.setData({ 'viewMore': true})
            component.vm.$nextTick(() => {
                expect(component.vm.contentStyles)
                    .toStrictEqual(contentStyleExpect)
            })
        })
    })

    it('shows report btn', () => {
        const reportBtn = component.find('.report')
        expect(reportBtn.exists()).toBeTruthy()
    })

    it('shows delete btn', () => {
        component.setProps({isUser: true})
        component.vm.$nextTick(() => {
            const deleteBtn = component.find('.delete')
            expect(deleteBtn.exists()).toBeTruthy()
        })
    })
})