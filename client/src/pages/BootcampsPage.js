import { useState, useEffect } from 'react'
/** @useHistory @useLocation */
import { useHistory, useLocation } from 'react-router-dom'
import {
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    Paper,
    Radio,
    RadioGroup,
    Slider,
    TextField,
    Typography
} from '@material-ui/core'
import axios from 'axios'
//components
import BootcampCard from '../components/BootcampCard'

/** styles */
const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        marginBottom: '1rem',
        padding: '13px'
    },
    filters: {
        padding: '0 1.5rem',

    },
    priceRangeInputs: {
        display: 'flex',
        justifyContent: 'space-between',
    }
})

const BootcampsPage = () => {

    /** material ui styles */
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const params = location.search ? location.search : null

    /** Component state*/
    const [bootcamps, setBootcamps] = useState([])
    const [loading, setLoading] = useState(false)

    const [sliderMax, setSliderMax] = useState(1000)
    const [priceRange, setPriceRange] = useState([25, 75])
    const [filter, setFilter] = useState('')


    /** side Effects*/
    /** getting the bootcamp data */
    useEffect(() => {
        let cancel

        const fetchData = async () => {
            setLoading(true)
            try {

                let query
                if (params && !filter) {
                    query = params
                } else {
                    query = filter
                }

                /** connection to the backend */
                const { data } = await axios({
                    method: "GET",
                    url: `http://localhost:3001/ap1/v1/bootcamps${query}`,
                    cancelToken: new axios.CancelToken((c) => cancel = c),
                })
                setBootcamps(data.data)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchData()
        return () => cancel()
    }, [filter, params])

    const onSliderCommitHandler = (e, newValue) => {
        buildRangeFilter(newValue)
    }
    const buildRangeFilter = (newValue) => {
        const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`
        setFilter(urlFilter)
        history.push(urlFilter)
    }

    return (
        <Container className={classes.root}>
            {/* filtering and sorting section */}
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Filters</Typography>
                        <div className={classes.filters}>
                            <Slider
                                min={0}
                                max={sliderMax}
                                value={priceRange}
                                valueLabelDisplay='auto'
                                onChange={(e, newValue) => setPriceRange(newValue)}
                                onChangeCommitted={onSliderCommitHandler}
                            />
                        </div>
                        <div className={classes.priceRangeInputs}>
                            {/* min price */}
                            <TextField
                                size='small'
                                id='lower'
                                label='Min Price'
                                variant='outlined'
                                type='number'
                                disabled={loading}
                                value={0}
                            />
                            {/* max price */}
                            <TextField
                                size='small'
                                id='upper'
                                label='Max Price'
                                variant='outlined'
                                type='number'
                                disabled={loading}
                                value={75}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>sort by</Typography>
                        <FormControl component='fieldset' className={classes.filters}>
                            <RadioGroup
                                aria-label='price-order'
                                name='price-order'
                            >
                                <FormControlLabel
                                    disabled={loading}
                                    control={<Radio />}
                                    label='price: Highest - Lowest'
                                />
                                <FormControlLabel
                                    disabled={loading}
                                    control={<Radio />}
                                    label='price: Lowest - Highest'
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* bootcamps listing */}
            <Grid container spacing={2}>
                {loading ? (
                    <div className={classes.loader}>
                        <CircularProgress size='3rem' thickness={5} />
                    </div>
                ) : (
                    /** bootcamps  have all the bootcamps information */
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

/**
 * @useHistory The useHistory hook helps us to access the history object, which is used to navigate programmatically
 * to other routes using push and replace methods.
 *
 * @useLocation hook helps us to access the location object, which contains the current URL location, search property.
 */