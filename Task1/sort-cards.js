/*!
 * JavaScript Library for boarding cards
 * Example of usage:
        var obj = new sortCards();
        var transp2 = obj.createBus();
        transp2.title = "the airport bus";
        obj.createCard("Barcelona", "Gerona Airport", transp2);
        var transp3 = obj.createAirplane("SK455", "45B", "3A", "Baggage drop at ticket counter 344");
        obj.createCard("Gerona Airport", "Stockholm", transp3);
        var transp4 = obj.createAirplane("SK22", "22", "7B", "Baggage will be automatically transferred from your last leg");
        obj.createCard("Stockholm", "New York JFK", transp4);
        var transp1 = obj.createTrain("78A", "45B");
        obj.createCard("Madrid", "Barcelona", transp1);

        var route = obj.buildRoute();

        for (var m =0; m < route.length; m++) {
            console.log(route[m].message);
        }
 */

"use strict";
var sortCards = function () {

/***********************************Card block***********************************/

    /**
     * Cards constructor
     * @param {String} from - for the point of departure
     * @param {String} to - for the point of arrival
     * @param {Object} by - for the mean of transport
     */
    function Card(from, to, by) {
        this.from = from;
        this.to = to;
        this.by = by;

        this.message = "Take " + by.title + " from " + this.from + " to " + this.to + ". " + this.by.message
    }

    /**
     * Creates a new boarding card and adds it to cards collection
     * @param {String} from
     * @param {String} to
     * @param {Object} by
     */
    this.createCard = function(from, to, by) {
        cards.push(new Card(from, to, by));
        listFrom.push(from);
        if (to !== null) {
            listTo.push(to);
        }
    };

/***********************************Transport block***********************************/
    /**
     * Train constructor
     * @param {String} pNumber - for the number of train
     * @param {String} seat - for the seat number
     */
    function Train(pNumber, seat) {
        this.title = "train";
        this.number = pNumber;
        this.seat = seat;
        if (seat == null) {
            this.message = "Number " + this.number + ". No seat assignment"
        }
        else {
            this.message = "Number " + this.number + ". Seat " + this.seat
        }
    }

    /**
     * Creates a new train
     * @param {String} pNumber
     * @param {String} seat
     */
    this.createTrain = function (pNumber, seat) {
        return new Train(pNumber, seat);
    };

    /**
     * Airplane constructor
     * @param {String} number - for the number of airplane
     * @param {String} gate - for the gate number
     * @param {String} seat - for the seat number
     * @param {String} baggage - for the baggage information
     */
    function Airplane(number, gate, seat, baggage) {
        this.title = "airplane";
        this.number = number;
        this.gate = gate;
        this.seat = seat;

        if (baggage == null) {
            this.message = "Number " + this.number + ". Gate " + this.gate + ". Seat " + this.seat + ". No baggage allowed."
        }
        else {
            this.message = "Number " + this.number + ". Gate " + this.gate + ". Seat " + this.seat + ". " + this.baggage
        }
    }

    /**
     * Creates a new airplane
     * @param {String} number
     * @param {String} gate
     * @param {String} seat
     * @param {String} baggage
     */
    this.createAirplane = function (number, gate, seat, baggage) {
        return new Airplane(number, gate, seat, baggage);
    };

    /**
     * Bus constructor
     * @param {String} seat - for the seat number
     */
    function Bus(seat) {
        this.title = "bus";
        this.seat = seat;

        if (seat == null) {
            this.message = "No seat assignment."
        }
        else {
            this.message = "Seat " + this.seat
        }
    }

    /**
     * Creates a new bus
     * @param {String} seat
     */
    this.createBus = function (seat) {
        return new Bus(seat);
    };

/***********************************Card processing***********************************/
    var listFrom = [];           //A list of cities
    var listTo = [];             //A list of destinations
    var cards = [];              //List of cards
    var sortedCards = [];        //For the resulting collection of cards

    /**
     * Sorts cards
     * @returns {Array} sortedCards - returns array of cards in the right order
     * @throws {Error} - if cards are not connected or cycled
     */
    this.buildRoute = function() {
        try {
            var start;  //For the city from the first card
            var citiesDifferenceCounter = listFrom.length;

            for (var k = 0; k < listFrom.length; k++) {
                var curFrom = listFrom[k];
                for (var l = 0; l < listTo.length; l++) {
                    if (curFrom === listTo[l]) {
                        citiesDifferenceCounter--;
                        break;
                    }

                    if (l === listTo.length-1) {
                        start = curFrom;
                    }
                }
            }
            if (citiesDifferenceCounter !== 1) {
                throw new Error("Cards are not connected or cycled");
            }

            var j = cards.length;
            while (j !== 0) {
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].from === start) {
                        sortedCards.push(cards[i]);
                        start = cards[i].to;
                        j--;
                    }
                }
            }

            return sortedCards;

        } catch (e) {
            console.log(e.name + ': ' + e.message);
        }
    };
};