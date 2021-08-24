import { useState, useEffect } from 'react'
import { CircularProgress, Container, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios'
//components
import BootcampCard from '../components/BootcampCard'

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const BootcampsPage = () => {

    /** material ui styles */
    const classes = useStyles()

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
        <Container className={classes.root}>
            {/* filtering and sorting section */}

            {/* bootcamps listing */}
            <Grid container spacing={2}>
                {loading ? (
                    <div className={classes.loader}>
                        <CircularProgress size='3rem' thickness={5} />
                    </div>
                ) : (
                    bootcamps.map(bootcamp => (
                        <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3}>
                            <BootcampCard bootcamp={bootcamp} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    )
}

export default BootcampsPage
