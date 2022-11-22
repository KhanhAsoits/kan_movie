import {makeAutoObservable} from "mobx";

class TicketStore {

    orderTicket = {
        selectedSeats: [],
        cinema: {},
        date: {},
        time: {},
        movie: {},
        total: 0
    }

    orderedTickets = []

    constructor() {
        makeAutoObservable(this)
    }

    setOrderTicketSelectSeat = (value) => {
        this.orderTicket.selectedSeats = value
    }

    setOrderTicketCinema = (value) => {
        this.orderTicket.cinema = value
    }

    setOrderTicketDate = (value) => {
        this.orderTicket.date = value
    }
    setOrderTicketTime = (value) => {
        this.orderTicket.time = value
    }
    setOrderTicketTotal = (value) => {
        this.orderTicket.total = value
    }
    setPreTicketData = (value) => {
        this.orderTicket = value
    }
    setOrderTicketMovie = (value) => {
        this.orderTicket.movie = value
    }
}

const ticketStore = new TicketStore()
export default ticketStore