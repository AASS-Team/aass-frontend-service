/**
 * Axios
 *
 * Usage:
 *
 * In components:
 * this.$axios.get('/')
 *
 * In Vuex Store:
 * import axios from '@/services/axios';
 *
 * axios.get('/')
 */
import axios from 'axios';

export default axios.create({
	baseURL: process.env.VUE_APP_API_URL
});
