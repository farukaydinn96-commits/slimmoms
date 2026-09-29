import axios from 'axios';

const getDiaryByDate = date => axios.get(`/api/diary/${date}`);

const addDiaryProduct = data => axios.post('/api/diary', data);

const deleteDiaryProduct = id => axios.delete(`/api/diary/${id}`);

export { getDiaryByDate, addDiaryProduct, deleteDiaryProduct };
