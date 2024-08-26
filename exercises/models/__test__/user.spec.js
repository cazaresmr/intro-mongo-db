const User = require('../user');

describe('User model', () => {

  beforeEach(async () => {
    // Drop the collection if it exists
    try {
      await User.collection.drop();
    } catch (e) {
      if (e.message !== 'ns not found') {
        throw e; // Ignore "ns not found" errors because it means the collection didn't exist
      }
    }
    
    // Ensure indexes are rebuilt
    await User.init();
  });
  
  test('email must be unique', async () => {
    expect.assertions(1); // Expect one assertion to be called
  
    try {
      await User.create({
        lastName: 'Williams',
        firstName: 'Sasha',
        email: 'email@gmail.com',
      });

      await User.create({
        lastName: 'Haas',
        firstName: 'Mel',
        email: 'email@gmail.com', // Attempt to create a duplicate
      });
    } catch (e) {
      expect(e).toBeTruthy(); // Ensure an error is thrown
    }
  });

  test('betaUser should default to false', async () => {
    const user = await User.create({
      firstName: 'Tilly',
      lastName: 'Mills',
      email: 'tg@gmail.com'
    });

    expect(user.betaUser).toBe(false);
  });

  test('should have correct fields', async () => {
    const now = Date.now();
    const { _id, __v, ...user } = (
      await User.create({
        firstName: 'Tilly',
        lastName: 'Mills',
        email: 'tg@gmail.com',
        birthDate: now, // they were born today 😎
        address: {
          street: 'Heming way',
          houseNumber: 1234,
          zip: 91917,
          city: 'SF',
          state: 'CA', // Notice the lowercase 's'
        },
        pets: ['tido', 'miguel'],
      })
    ).toObject();
  
    expect(user).toEqual({
      firstName: 'Tilly',
      lastName: 'Mills',
      email: 'tg@gmail.com',
      birthDate: new Date(now),
      betaUser: false,
      address: {
        street: 'Heming way',
        houseNumber: 1234,
        zip: 91917,
        city: 'SF',
        state: 'CA', // Adjusted to match the input
      },
      pets: ['tido', 'miguel'],
    });
  });
  
});
