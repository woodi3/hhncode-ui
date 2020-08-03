import { mount } from '@vue/test-utils'
module.exports = {
    getMountedComponent: function(Component, stubs, propsData, opts={}) {
        return mount(Component, {
            propsData,
            stubs,
            ...opts
        })
    },
    mocks: {
        $store: {
            state: {}
        }
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
        },
        {
            "_id": "5ecdb07e9f43aa61a93ad1a0",
            "comments": [],
            "tags": [
                {
                    "_id": "5ecae6b34cca785c12eb30df",
                    "text": "JavaScript",
                    "color": "gold",
                    "description": "Anything JavaScript related.",
                    "createdAt": new Date("2020-05-24T21:27:15.491Z"),
                    "updatedAt": new Date("2020-05-25T01:53:42.590Z"),
                    "__v": 0
                },
                {
                    "_id": "5ecae6b34cca785c12eb30e0",
                    "text": "Angular",
                    "color": "firebrick",
                    "description": "Anything Angular related.",
                    "createdAt": new Date("2020-05-24T21:27:15.493Z"),
                    "updatedAt": new Date("2020-05-24T21:27:15.493Z"),
                    "__v": 0
                },
                {
                    "_id": "5ecae6b34cca785c12eb30e2",
                    "text": "CSS",
                    "color": "lightskyblue",
                    "description": "Anything CSS related.",
                    "createdAt": new Date("2020-05-24T21:27:15.496Z"),
                    "updatedAt": new Date("2020-05-24T21:27:15.496Z"),
                    "__v": 0
                }
            ],
            "title": "Angular: The Beginner's Guide",
            "headerImg": "https://res.cloudinary.com/promo/image/upload/v1590538361/k60s9kvjpfw8lwoycxbw.png",
            "content": "{\"ops\":[{\"insert\":\"Some content here and there\\n\"}]}",
            "isTutorial": true,
            "isDraft": false,
            "isTrending": true,
            "totalReads": 11,
            "totalWords": 0,
            "createdAt": new Date("2020-05-27T00:12:46.824Z"),
            "updatedAt": new Date("2020-07-04T17:16:26.839Z"),
            "__v": 1,
            "meta": {
                "subtitle": "Learn to build modular and structured applications."
            },
            "isCode": true,
            "totalViews": 13
        },
        {
            "_id": "5ecdb8234909067a938bb23e",
            "comments": [],
            "tags": [
                {
                    "_id": "5ecae6b34cca785c12eb30df",
                    "text": "JavaScript",
                    "color": "gold",
                    "description": "Anything JavaScript related.",
                    "createdAt": new Date("2020-05-24T21:27:15.491Z"),
                    "updatedAt": new Date("2020-05-25T01:53:42.590Z"),
                    "__v": 0
                },
                {
                    "_id": "5ecae6b34cca785c12eb30e2",
                    "text": "CSS",
                    "color": "lightskyblue",
                    "description": "Anything CSS related.",
                    "createdAt": new Date("2020-05-24T21:27:15.496Z"),
                    "updatedAt": new Date("2020-05-24T21:27:15.496Z"),
                    "__v": 0
                }
            ],
            "title": "Introduction to HTML, CSS, and JavaScript",
            "headerImg": "https://res.cloudinary.com/promo/image/upload/v1590540298/ns3l77lf9xgr3vxxu8nx.png",
            "content": "{\"ops\":[{\"insert\":\"Some dummy content\\n\"}]}",
            "isTutorial": true,
            "isDraft": false,
            "isTrending": true,
            "totalReads": 12,
            "totalWords": 0,
            "meta": {
                "subtitle": "Learn the basics to building modern websites."
            },
            "createdAt": new Date("2020-05-27T00:45:23.682Z"),
            "updatedAt": new Date("2020-08-02T20:41:17.975Z"),
            "__v": 1,
            "isCode": true,
            "totalViews": 12
        },
        {
            "_id": "5eded61e311ac720da1bb9f2",
            "tags": [
                {
                    "_id": "5eded509311ac720da1bb9f0",
                    "text": "Announcement",
                    "description": "Posts that are announcements",
                    "color": "yellow",
                    "createdAt": new Date("2020-06-09T00:17:13.639Z"),
                    "updatedAt": new Date("2020-06-09T00:17:13.639Z"),
                    "__v": 0
                }
            ],
            "title": "Hip Hop and Code: The Origin Story",
            "headerImg": "https://via.placeholder.com/500x500",
            "content": "{\"ops\":[{\"insert\":\"Hip Hop and my beginnings\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\tLet's be clear, Hip Hop represents culture, \"},{\"attributes\":{\"bold\":true},\"insert\":\"NOT\"},{\"insert\":\" a genre of music. I first immersed myself into Hip Hop when I was around 8-9 years old; the process started with \"},{\"attributes\":{\"italic\":true},\"insert\":\"Platinum & Gold Collection by DJ Jazzy Jeff and The Fresh Prince\"},{\"insert\":\". I had just received my first CD player for Christmas and this was the first CD I ever owned. I learned every word on that CD in a weeks time; at this moment, I began to write my own corny raps that we all write when we’re in the 4th and 5th grade. I didn’t take the time to actually learn how to structure a rap or what a rhyme scheme was, but I mimicked to the best of my abilities what The Fresh Prince was doing. Again, it was SUPER corny but I rocked with it; this was my beginning. From here, I would dive deep into 80s and 90s rap. I wouldn’t watch regular TV; I would just have the \"},{\"attributes\":{\"italic\":true},\"insert\":\"Old School Hip-Hop/Rap\"},{\"insert\":\" channel 24/7. Once I had heard all the tracks they played, I pirated as much music as I could (pre-streaming days). \\n\\n\\tAs I was researching lyrics, I would come across a plethora of movie references; things I hadn’t seen. This curiosity blossomed and I became a mini-cinephile when it came to Black films. I got them all on bootleg or binged the ones my family had. Catching rap references was like my 3rd eye opening. I then dived into a rapper by the name of Lupe Fiasco. To this day, there are still references I’m just now catching. Hip Hop has taught me almost everything I know; Hip Hop awakened my consciousness — opened my eyes to things I wouldn’t have noticed until too late. I owe a lot to Hip Hop and this platform is a start. \\n\\nThe Boy who didn't want to Code\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\tAs I stated at the beginning of this post, I am passionate about coding. Ironically enough, I never wanted to be a coder. My father is a developer and shoved it down my throat. It’s no telling how many programming books he tried to get me to read. I despised coding. In my family, going to college was a must so I could get a job; my major didn’t matter as long as it lead to me getting a job. I knew I wanted to go into tech, just because I knew that’s where the money was. Being the kid I was, I only wanted to make a lot of money, tons of it, Zuckerberg type of money; therefore, I went into business. \\n\\tIn high school, I was 1 of 3 students to take ALL the available business classes. Senior year, my business teacher asked me what I wanted to do and I told her: make a lot of money in tech. I got accepted at the University of South Carolina for their International Business program (#1 in the country). My teacher advised me to switch my major to a tech specific major and broke it down that I already knew all the business stuff I needed. So I switched my major to Computer Science. My freshman year at UofSC, I didn’t care about coding one bit or school for that matter. Fast-forward to the end of my Sophomore year and I help create Minorities in Computing, an organization dedicated to minorities in the Computing College. I realized the reach and power we possessed by understanding technology and how that could affect our community. From that moment, I looked at coding through a completely different lens. It wasn’t about making a shit ton of money anymore. \\n\\nThe Platform\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\tHip Hop and Code will serve as a platform to contribute to Hip Hop, through way of shedding light on artists and projects, curators, and giving flowers when possible. This platform will educate viewers who are interested in coding or even the different technologies. Day by day in the Black community, tech illiteracy is rising proving to be another barrier of entry to a gigantic industry. This platform will help those who have the ability to spread information to help increase our literacy. If you have suggestions for topics or a point you want to highlight, reach out and I can do my best. \\n\"}]}",
            "isTutorial": false,
            "isDraft": false,
            "isTrending": true,
            "totalReads": 2,
            "totalWords": 0,
            "isHipHop": true,
            "isCode": true,
            "meta": {
                "subtitle": "This is my first platform combining two things I'm passionate about — Hip Hop and Code."
            },
            "createdAt": new Date("2020-06-09T00:21:50.349Z"),
            "updatedAt": new Date("2020-08-01T18:38:11.418Z"),
            "__v": 2,
            "totalViews": 17
        }
    ]
}