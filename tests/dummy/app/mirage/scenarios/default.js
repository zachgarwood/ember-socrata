export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  server.createList('company', 10);
  server.createList('employee', 10);
}
