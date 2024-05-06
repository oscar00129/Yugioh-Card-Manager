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
        rightClickCard(event, index){
            this.yourCards.splice(index, 1);
            event.preventDefault();
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
        },
        dropCard(event){
            this.yourCards.push(this.draggedCard);
        },
        exportCollection(){
            let yourCardsString = JSON.stringify(this.yourCards);
            var blob = new Blob([yourCardsString], { type: "application/json" });
            saveAs(blob, "datos.json");
        },
        importCollection(event){
            let file = event.target.files[0];
            let fr = new FileReader();

            fr.onload = () => {
                let content = fr.result;
                let data = JSON.parse(content);
                this.yourCards = data;
            }
            fr.readAsText(file);
        }
    }
})

 app.mount('#app');