export const quillConfig = {
    theme: 'snow',
    placeholder: 'Start your post',
    bound: '.create',
    scrollingContainer: '.create',
    modules: {
        toolbar: {
            container: [
                [
                    {
                        size: [
                            'small',
                            false,
                            'large',
                            'huge',
                        ]
                    },
                    {
                        header: 1
                    },
                    {
                        header: 2
                    },
                    'color',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'align',
                ],
                [
                    {
                        list: 'ordered'
                    },
                    {
                        list: 'bullet',
                    },
                ],
                [
                    'blockquote',
                    'code-block'
                ],
                [
                    'link',
                    'image',
                ],
            ]
        }
    }
}

