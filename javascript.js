const app = Vue.createApp({
    data() {
        return {
            message: "Hello World!",
            cards: [],
            displayedCards: [],
            yourCards: [],
            cardViewing: {},
            searchTextAll: '',
            searchTextYours: '',
            draggedCard: {}
        }
    },
    mounted(){
        fetch('./response.json')
        .then((response) => response.json())
        .then((json) => this.cards = json.data)
        .finally(() => this.limit30DisplayedCards());
    },
    methods: {
        clickCard(card){
            this.cardViewing = card;
        },
        searchCardAll(){
            if(this.searchTextAll == ""){
                this.limit30DisplayedCards();
            }else{
                this.displayedCards = this.cards.filter((card) => card.name.toLowerCase().includes(this.searchTextAll.toLowerCase()) || card.desc.toLowerCase().includes(this.searchTextAll.toLowerCase()));
            }
        },
        searchCardYours(){
            
        },
        limit30DisplayedCards(){
            this.displayedCards = this.cards.slice(0, 30);
        },
        dragCard(card){
            this.draggedCard = card;
            console.log(this.draggedCard);
        },
        dropCard(event){
            this.yourCards.push(this.draggedCard);
        }
    }
})

 app.mount('#app');