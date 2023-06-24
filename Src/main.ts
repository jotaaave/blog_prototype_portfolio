import { Blog } from './classes/blog';
import { GenerateId } from './classes/generateId';
import { app } from './classes/app';
import { Route } from './routes/router';
import mongoose from 'mongoose';
import endpoint from '../endpoints.config';

const blog = new Blog(new GenerateId());
const route = new Route(blog);

mongoose.connect(endpoint.MongoURI).then(() => {
  console.log('Mongoose has been connect in MongoDB!');
});

app.middleware();
app.router(route.router);

app.server.listen(8000, () => {
  console.log('Servidor Ligado!');
});
