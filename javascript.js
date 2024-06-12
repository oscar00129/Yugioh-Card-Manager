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
            draggedCard: {},
            archetypes: []
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
            console.log(card);
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
        dropCard(){
            this.yourCards.push(this.draggedCard);
            //this.yourCards = this.orderDisplayedCards(this.yourCards);
        },
        getArchetypes(cards){
            let archetypes = [];

            cards.forEach((card) => {
                if(card.archetype){
                    if(!archetypes.includes(card.archetype)){
                        archetypes.push(card.archetype);
                    }
                }
            })

            return archetypes;
        },
        orderYourCards(){
            this.yourCards = this.orderDisplayedCards(this.yourCards);
        },
        orderDisplayedCards(cards){
            cards.sort(this.compareByName);

            let groupedCards = {};
            let frameTypes = [
                'normal',
                'effect',
                'ritual',
                'spell',
                'trap',
                'fusion',
                'synchro',
                'xyz',
                'normal_pendulum',
                'effect_pendulum',
                'ritual_pendulum',
                'fusion_pendulum',
                'synchro_pendulum',
                'xyz_pendulum',
                'link',
                'skill',
                'token'
            ]

            frameTypes.forEach((frameType) => {
                groupedCards[frameType] = cards.filter((card) => card.frameType === frameType)
            });

            let result = [];
            frameTypes.forEach((frameType) => {
                result = result.concat(groupedCards[frameType])
            });
            return result;
        },
        compareByName(a, b) {
            if(a.name < b.name){
                return -1;
            }
            if(a.name > b.name){
                return 1;
            }
            return 0;
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