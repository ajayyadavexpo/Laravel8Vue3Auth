<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-sm-4 mt-5">
				<form @submit.prevent="login" v-if="isAuthenticated == false">
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" class="form-control" v-model="form.email"/>
					</div>			
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" class="form-control" v-model="form.password"/>
					</div>			
					
					<button type="submit" class="btn btn-dark">Login</button>
				</form>

				<div v-else>
					<h2>Dashboard ....</h2>
					<button type="button" class="btn btn-dark" @click="logout">Logout</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { reactive, inject,ref, onMounted } from 'vue';
	import axios from 'axios';
	export default{
		setup(){
			let cookies = inject('cookies')
			let isAuthenticated = ref(false)
			const form = reactive({
				email:'',
				password:''
			});

			const login = async()=>{
				let res = await axios.post('api/login',form)
				if(res.data.access_token){
					cookies.set('access_token',res.data.access_token)
					isAuthenticated.value = true
				}
			}

			const checkLogin = ()=>{
				if(cookies.get('access_token')){
					isAuthenticated.value = true;
				}
			}

			const logout = () =>{
				if(cookies.get('access_token')){
					cookies.set('access_token','')
					isAuthenticated.value = false;
				}
			}

			onMounted(checkLogin)

			return {
				form,
				login,
				isAuthenticated,
				logout
			}
		}
	}
</script>