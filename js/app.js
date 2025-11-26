const { createApp } = Vue;

createApp({
    data() {
        return {
            currentPage: 'lessons',
            searchQuery: '',
            sortField: 'subject',
            sortAsc: true,
            cart: [],
            checkoutSuccess: false,
            checkoutForm: {
                name: '',
                phone: '',
                nameError: false,
                phoneError: false
            },
            API_URL: 'https://edu-backend-ken.onrender.com',
            lessons: []
        };
    },
    mounted() {
        // Fetch lessons from backend when component mounts
        this.fetchLessons();
    },
    watch: {
        // Watch for search query changes - debounced search
        searchQuery(newQuery) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.searchLessons(newQuery);
            }, 300); // 300ms delay for "search as you type"
        }
    },
    computed: {
        filteredLessons() {
            // Sort the lessons
            let sorted = [...this.lessons];
            
            sorted.sort((a, b) => {
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

            return sorted;
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
    },
    methods: {
        // Fetch all lessons from backend
        async fetchLessons() {
            try {
                this.loading = true;
                const response = await fetch(`${this.API_URL}/lessons`);
                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }
                const data = await response.json();
                this.lessons = data.map(lesson => ({
                    ...lesson,
                    image: lesson.image.startsWith('http') 
                        ? lesson.image 
                        : `${this.API_URL}${lesson.image}`
                }));
                this.loading = false;
            } catch (error) {
                console.error('Error fetching lessons:', error);
                alert('Failed to load lessons. Please check if the backend server is running.');
                this.loading = false;
            }
        },
        // Search lessons via backend API
        async searchLessons(query) {
            try {
                this.loading = true;
                const response = await fetch(`${this.API_URL}/search?q=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                const data = await response.json();
                this.lessons = data;
                this.loading = false;
            } catch (error) {
                console.error('Error searching lessons:', error);
                this.loading = false;
            }
        },
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
            const lessonId = lesson._id || lesson.id;
            const existingItem = this.cart.find(item => (item._id || item.id) === lesson.id);
            if (existingItem) {
                // Increase quantity
                existingItem.quantity++;
            } else {
                // Add new item to cart
                this.cart.push({
                    _id: lesson._id,
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
            const cartIndex = this.cart.findIndex(item => (item._id || item.id) === lessonId);
            if (cartIndex > -1) {
                const item = this.cart[cartIndex];
                // Add all slots back
                const lesson = this.lessons.find(l => (l._id || l.id) === lessonId);
                if (lesson) {
                    lesson.slots += item.quantity;
                }
                // Remove from cart
                this.cart.splice(cartIndex, 1);
            }
        },
        increaseQuantity(lessonId) {
            const lesson = this.lessons.find(l => (l._id || l.id) === lessonId);
            if (lesson && lesson.slots > 0) {
                const cartItem = this.cart.find(item => (item._id || item.id) === lessonId);
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
            const cartItem = this.cart.find(item => (item._id || item.id) === lessonId);
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
        },
        isCheckoutValid() {
            const nameRegex = /^[a-zA-Z\s]+$/;
            const phoneRegex = /^[0-9]+$/;

            this.checkoutForm.nameError = !nameRegex.test(this.checkoutForm.name) || this.checkoutForm.name.trim() === '';
            this.checkoutForm.phoneError = !phoneRegex.test(this.checkoutForm.phone) || this.checkoutForm.phone.trim() === '';

            return !this.checkoutForm.nameError && !this.checkoutForm.phoneError;
        },
        checkout() {
            if (this.isCheckoutValid()) {
                this.checkoutSuccess = true;
                // Reset after 3 seconds
                setTimeout(() => {
                    this.cart = [];
                    this.checkoutForm = {
                        name: '',
                        phone: '',
                        nameError: false,
                        phoneError: false 
                    };
                    this.checkoutSuccess = false;
                    this.currentPage = 'lessons';
                }, 3000);
            }
        }
    }
}).mount('#app');