const { createApp } = Vue;

createApp({
    data() {
        return {
            currentPage: 'lessons',
            lessons: [
                {
                    id: 1,
                    subject: 'Mathematics',
                    location: 'Room 101',
                    price: 45,
                    slots: 5,
                    instructor: 'Mr. Johnson',
                    image: ''
                },
                {
                    id: 2,
                    subject: 'English Literature',
                    location: 'Room 202',
                    price: 40,
                    slots: 5,
                    instructor: 'Ms. Smith',
                    image: ''
                },
                {
                    id: 3,
                    subject: 'Science Lab',
                    location: 'Lab Building',
                    price: 55,
                    slots: 5,
                    instructor: 'Dr. Brown',
                    image: ''
                },
                {
                    id: 4,
                    subject: 'Spanish Conversation',
                    location: 'Room 305',
                    price: 35,
                    slots: 5,
                    instructor: 'Señora Garcia',
                    image: ''
                },
                {
                    id: 5,
                    subject: 'Piano Lessons',
                    location: 'Music Studio',
                    price: 60,
                    slots: 5,
                    instructor: 'Mr. Davis',
                    image: ''
                },
                {
                    id: 6,
                    subject: 'Soccer Training',
                    location: 'Sports Field',
                    price: 30,
                    slots: 5,
                    instructor: 'Coach Martinez',
                    image: ''
                },
                {
                    id: 7,
                    subject: 'Art & Design',
                    location: 'Art Studio',
                    price: 50,
                    slots: 5,
                    instructor: 'Ms. Wilson',
                    image: ''
                },
                {
                    id: 8,
                    subject: 'Computer Programming',
                    location: 'Computer Lab',
                    price: 65,
                    slots: 5,
                    instructor: 'Mr. Kumar',
                    image: ''
                },
                {
                    id: 9,
                    subject: 'Debate Club',
                    location: 'Room 401',
                    price: 25,
                    slots: 5,
                    instructor: 'Ms. Anderson',
                    image: ''
                },
                {
                    id: 10,
                    subject: 'Robotics Workshop',
                    location: 'Innovation Lab',
                    price: 75,
                    slots: 5,
                    instructor: 'Mr. Chen',
                    image: ''
                },
                {
                    id: 11,
                    subject: 'Chemistry Basics',
                    location: 'Lab Building',
                    price: 50,
                    slots: 5,
                    instructor: 'Dr. Patel',
                    image: ''
                }
            ]
        };
    },
    computed: {
        
    },
    methods: {
        
    }
}).mount('#app');