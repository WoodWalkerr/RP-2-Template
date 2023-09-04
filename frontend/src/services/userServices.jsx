export async function getAllusers() {
    try {
        const response = await fetch('/api/v1/users')
        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.error(error.message)
    }
}

export async function deleteUser(id) {
    try {
        const confirmation = window.confirm(
            'Are you sure you want to delete this data'
        )
        if (confirmation) {
            const response = await fetch(`/api/v1/users/${id}`, {
                method: 'DELETE'
            })
            return true
        }
    } catch (error) {
        console.error(error.message)
    }
}

export async function updateUser(userInfo) {

    try {
        const response = await fetch('/api/v1/users', {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ users: userInfo })
        })
        return await response.json()
    } catch (error) {
         console.error(error.message)
    }
}