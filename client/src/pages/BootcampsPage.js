import { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios'

const BootcampsPage = () => {

    /** Component state*/
    const [bootcamps, setBootcamps] = useState([])
    const [loading, setLoading] = useState(false)

    /** side Effects*/
    /** getting the bootcamp data */
    useEffect(() => {
        let cancel
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data } = await axios({
                    method: "GET",
                    url: 'http://localhost:3001/ap1/v1/bootcamps/',
                    cancelToken: new axios.CancelToken((c) => cancel = c),
                })
                setBootcamps(data.data)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchData()
    }, [])

    return (
        <Container>
            {/* filtering and sorting section */}

            {/* bootcamps listing */}
        </Container>
    )
}

export default BootcampsPage
