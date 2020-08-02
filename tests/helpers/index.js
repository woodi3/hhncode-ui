import { mount } from '@vue/test-utils'
module.exports = {
    getMountedComponent: function(Component, stubs, propsData, opts={}) {
        return mount(Component, {
            propsData,
            stubs,
            ...opts
        })
    },
    zenTags: [
        'zen-box', 
        'zen-flex', 
        'zen-text', 
        'zen-button', 
        'v-icon'
    ],
    mockPosts: [
        {
            "_id": "5f20abdf25d7b2f19a7d0691",
            "tags": [
                {
                    "_id": "5ecae6b34cca785c12eb30dd",
                    "text": "Review",
                    "color": "cyan",
                    "description": "Anything that is a review.",
                    "createdAt": new Date("2020-05-24T21:27:15.484Z"),
                    "updatedAt": new Date("2020-05-24T21:27:15.484Z"),
                    "__v": 0
                }
            ],
            "title": "The Imperfect Storm - EP",
            "headerImg": "https://res.cloudinary.com/promo/image/upload/v1595976664/sulwfx9t0ldj8m3vfucf.jpg",
            "content": "{\"ops\":[{\"insert\":\"Some dummy content\\n\"}]}",
            "isTutorial": false,
            "isDraft": false,
            "isTrending": false,
            "isReview": true,
            "totalReads": 5,
            "totalWords": 0,
            "totalViews": 5,
            "meta": {
                "subtitle": "An album by Wale"
            },
            "createdAt": new Date("2020-07-28T22:51:11.950Z"),
            "updatedAt": new Date("2020-08-02T19:40:48.622Z"),
            "__v": 1
        }
    ]
}