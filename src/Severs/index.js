import io from 'socket.io-client';

//var http = 'http://192.168.1.13:3000';
var http = 'http://192.168.68.162:3000';
//var http = 'http://192.168.56.1:3000';
//var http = 'http://192.168.23.162:3000';
const socket = io(http);

export const SEVER = {
  ID_USER: '',
  NAME_USER: '',
  AVT_USER: '',

  IO: socket,
  link_img_main: http + '/static/',
  link_get_satus: http + '/getdata_status',
  link_post_satus: http + '/insert_staus',
  link_delete_satus: http + '/delete_status_profile',
  link_update_satus: http + '/update_status_profile',

  link_post_user: http + '/insertruser',
  link_login_user: http + '/login',

  // friend
  link_list_friend: http + '/getdatafriend1',
  link_add_friend: http + '/addfriends',
  link_dagui_friend: http + '/getdatafrienddagui',
  link_accept_friend: http + '/acceptaddfriends',
  link_my_friend: http + '/getdatalistfriend',
  link_cancel_my_friend: http + '/cancelfrieb',
  link_seacrh: http + '/search',

  // update avtart
  link_update_avatar: http + '/updateavatar',

  // link sento gmail
  link_sencode: http + '/send',
  link_checkcode: http + '/checksend',
  link_update_pass: http + '/updatepass',
};
