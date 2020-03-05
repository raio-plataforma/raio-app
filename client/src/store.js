import { createStore } from 'easy-peasy';
import GlobalModels from './models'

const {
  example,
  authModel,
  uiModel,
  registerModel,
  userModel,
  vacancyModel,
  enterpriseModel
} = GlobalModels

const storeModel = {
  products: example,
  auth: authModel,
  register: registerModel,
  user: userModel,
  vacancy: vacancyModel,
  enterprise: enterpriseModel,
  ui: uiModel
};

const store = createStore(storeModel);

export default store