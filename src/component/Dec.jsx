import React, { Component } from 'react';
import Card from './Card'
import './dec.css'
import axios from 'axios'

const baseUrl = 'https://deckofcardsapi.com/api/deck/';

class Dec extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            deckId : null,
            items: []
         }
    }

    // `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    async componentDidMount(){

        const url = `${baseUrl}new/shuffle/?deck_count=1`;
        let res = await axios.get(url);
        this.setState({
            deckId: res.data
        })
    }

     handleButton = async () => {
        let id = this.state.deckId.deck_id;
        const url = `${baseUrl}${id}/draw/`;
        let res = await axios.get(url);
        let card = res.data.cards[0];

        
        try{
            if (!res.data.success) {
                throw new Error("No card remaining!");
              }

            this.setState(st => ({
                items: [
                    ...st.items, {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }))

            } catch(err){
                alert(err)
            }


    }
    render() { 
        
        let cards = this.state.items.map(item => {
            return  <Card key={item.id} url={item.image} name={item.name} />
        })

        return ( 
        <div className='Deck'>
            <h1 className='Deck-title'>♦ Card Dealer ♦</h1>
            <h2 className='Deck-title subtitle'>
            ♦ A little demo made with React ♦
            </h2>
            <button className='Deck-btn' onClick={this.handleButton}>
            Get Card!
            </button>
            <div className='Deck-cardarea'>{cards}</div>
        </div>
        );
    }
}

export default Dec;