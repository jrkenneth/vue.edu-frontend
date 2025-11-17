const { createApp } = Vue;

createApp({
    data() {
        return {
            currentPage: 'lessons',
            searchQuery: '',
            sortField: 'subject',
            sortAsc: true,
            cart: [],
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

            // Filter by search query
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(lesson => {
                    return (
                        lesson.subject.toLowerCase().includes(query) ||
                        lesson.location.toLowerCase().includes(query) ||
                        lesson.instructor.toLowerCase().includes(query) ||
                        lesson.price.toString().includes(query)
                    );
                });
            }

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
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
        },
        addToCart(lesson) {
            // Check if slots are available
            if (lesson.slots === 0) {
                alert(`Sorry! All slots for ${lesson.subject} have been exhausted.`);
                return;
            }

            // Check if lesson already in cart
            const existingItem = this.cart.find(item => item.id === lesson.id);
            if (existingItem) {
                // Increase quantity
                existingItem.quantity++;
            } else {
                // Add new item to cart
                this.cart.push({
                    id: lesson.id,
                    subject: lesson.subject,
                    location: lesson.location,
                    price: lesson.price,
                    instructor: lesson.instructor,
                    quantity: 1
                });
            }

            // Reduce slots
            lesson.slots--;
        },
        removeFromCart(lessonId) {
            const cartIndex = this.cart.findIndex(item => item.id === lessonId);
            if (cartIndex > -1) {
                const item = this.cart[cartIndex];
                // Add all slots back
                const lesson = this.lessons.find(l => l.id === lessonId);
                if (lesson) {
                    lesson.slots += item.quantity;
                }
                // Remove from cart
                this.cart.splice(cartIndex, 1);
            }
        },
        increaseQuantity(lessonId) {
            const lesson = this.lessons.find(l => l.id === lessonId);
            if (lesson && lesson.slots > 0) {
                const cartItem = this.cart.find(item => item.id === lessonId);
                if (cartItem) {
                    cartItem.quantity++;
                    lesson.slots--;
                }
            } else {
                const cartItem = this.cart.find(item => item.id === lessonId);
                alert(`Sorry! No more slots available for ${cartItem.subject}.`);
            }
        },
        decreaseQuantity(lessonId) {
            const cartItem = this.cart.find(item => item.id === lessonId);
            if (cartItem) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity--;
                    const lesson = this.lessons.find(l => l.id === lessonId);
                    if (lesson) {
                        lesson.slots++;
                    }
                } else {
                    // If quantity is 1, remove the item entirely
                    this.removeFromCart(lessonId);
                }
            }
        },
        canIncreaseQuantity(lessonId) {
            const lesson = this.lessons.find(l => l.id === lessonId);
            return lesson && lesson.slots > 0;
        }
    }
}).mount('#app');