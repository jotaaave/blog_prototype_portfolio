import { BLogPostWithIdAndDate } from './interfaces';

export const postError: BLogPostWithIdAndDate = {
  author: 'Sistema',
  title: 'Ocorreu um erro ao buscar esse post!',
  content: 'Nenhum post foi encontrado',
  id: 404,
  category: 'Programming',
  date: new Date().toLocaleDateString(),
};
