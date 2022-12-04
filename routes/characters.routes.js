const express = require('express');
const router = express.Router();
const ApiService = require('../services/api.service');
const apiService = new ApiService();

router.get('/create', (req, res, next) => {
  try {
    res.render('characters/character-create');
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { name, occupation, weapon } = req.body;
    await apiService.createCharacter({ name, occupation, weapon });
    res.redirect('/characters');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allCharacters = await apiService.getAllCharacters();
    // console.log('All Characters:', allCharacters);
    res.render('characters/characters-list', {
      characters: allCharacters.data
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
