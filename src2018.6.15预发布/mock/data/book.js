/**
 * Created by jerry on 2017/4/14.
 */

import Mock from 'mockjs'

const Books = [];
for (let i = 0; i < 100; i++) {
  Books.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    author: Mock.Random.cname(),
    description: Mock.Random.csentence(180, 500),
    publishAt: Mock.Random.date()
  }))
}
export default Mock.mock('http://g.cn', {
  'name'    : '@name',
  'age|1-100': 100,
  'color'    : '@color'
});

export {Books}
