// import faker from 'faker';

export default class Tester {
  records = [];
  init() {}
}

export const generateRandomArray = number => {
  let arr = [];
  for (let i = 0; i < number; i++) {
    arr.push({
      name: "name title name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquam ipsum vitae elit blandit, sit amet fringilla ipsum eleifend. Aliquam rhoncus, velit a consectetur pulvinar, risus felis rutrum tortor, eleifend fermentum elit felis nec est. Praesent ac lectus et mauris cursus porttitor. Fusce feugiat eros nec tristique ornare. Nulla sem quam, aliquam sit amet dapibus et, tempus id ante. Mauris ultricies neque ut ultrices consequat. Donec tempus vestibulum ultrices. Vivamus condimentum diam in risus fermentum, ut aliquam ipsum egestas.",
      id: "12121212",
      url: "abcdsde url",
      date: "12/12/12"
    });
  }
  return arr;
};
