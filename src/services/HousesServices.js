const { AppState } = require("../AppState");
const { Car } = require("../models/Car");
const { House } = require("../models/House");
const { logger } = require("../utils/Logger");
const { api } = require("./AxiosService");


class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    logger.log(res.data)
    AppState.houses = res.data.map(h => new House(h))
  }

  async getById(id) {
    const res = await api.get('api/houses/' + id)
    logger.log(res.data)
    AppState.houses = new House(res.data)
  }

  async createHouse(newHouse) {
    const res = await api.post('api/houses/', newHouse)
    logger.log(res.data)
    AppState.houses = (new House(res.data))
  }

  async editHouses(updatedHouse) {
    const res = await api.put('api/houses' + updatedHouse.id, updatedHouse)
    logger.log(res.data)
    AppState.houses = new House(res.data)
  }

  async getComments(houseId) {
    const res = await api.get(`api/houses/${houseId}/comments`)
    logger.log(res.data)
    AppState.comments = res.data
  }
}

export const housesService = new HousesService()