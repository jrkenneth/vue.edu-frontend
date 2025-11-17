const { createApp } = Vue;

createApp({
    data() {
        return {
            currentPage: 'lessons',
            sortField: 'subject',
            sortAsc: true,
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
        filteredLessons() {
            let filtered = this.lessons;

            // Sort
            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];

                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                if (aVal < bVal) return this.sortAsc ? -1 : 1;
                if (aVal > bVal) return this.sortAsc ? 1 : -1;
                return 0;
            });

            return filtered;
        }
    },
    methods: {
        sortBy(field) {
            if (this.sortField === field) {
                this.sortAsc = !this.sortAsc;
            } else {
                this.sortField = field;
                this.sortAsc = true;
            }
        }
    }
}).mount('#app');