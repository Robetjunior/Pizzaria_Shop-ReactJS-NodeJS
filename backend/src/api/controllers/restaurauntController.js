import {
  fetchRestaurant,
  createRestaurantWithManager,
  getManagedRestaurantService,
  updateProfileService,
} from "../../services/restaurauntService.js";

export const getRestaurants = async (req, res) => {
  try {
    const users = await fetchRestaurant();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getManagedRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;
    const managerRestaurant = await getManagedRestaurantService(userId);
    res.json(managerRestaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.user.id;

    await updateProfileService({
      id,
      name,
      description,
    });

    res.status(201).json({ message: `atualização efetuado com sucesso!` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, managerName, email, phone } = req.body;

    await createRestaurantWithManager({
      restaurantName,
      managerName,
      email,
      phone,
    });

    res.status(201).json({ message: `cadastro efetuado com sucesso!` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
