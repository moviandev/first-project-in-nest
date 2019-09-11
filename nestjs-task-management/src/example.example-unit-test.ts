// Feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name}, is now a friend :>`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend Not Found');
    }

    this.friends.splice(idx, 1);
  }
}

// Test
describe('FriendsList', () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Matheus');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();
    friendsList.addFriend('Matheus');

    expect(friendsList.announceFriendship).toHaveBeenCalled();
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Matheus');
      expect(friendsList.friends[0]).toEqual('Matheus');
      friendsList.removeFriend('Matheus');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('Throws an error as friend', () => {
      expect(() => friendsList.removeFriend('Matheus')).toThrow();
    });
  });
});
