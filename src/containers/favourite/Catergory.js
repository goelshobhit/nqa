import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import { ListItem } from "../../components";
import { useSelector } from "react-redux";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { useData } from "../../hooks/useData";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../db/services";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#f7f7f7",
        minHeight: `calc(100vh - 120px)`,
        padding: theme.spacing(5, 0, 10, 0),
    },

    image: {
        width: "70%",
        borderRadius: 1000,

        [theme.breakpoints.down("sm")]: {
            width: 100,
            marginRight: theme.spacing(5),
        },
    },

    categoryContainer: {
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

        [theme.breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            height: 100,
            alignItems: "center",
        },
    },
}));

export default function Home() {
    const classes = useStyles();
    const params = useParams();
    const theme = useTheme();

    const categoryId = params.id;

    const [categoryDetails, setCategoryDetails] = useState(null);
    const [isFav, setIsFav] = useState(false);

    const { offlineMode } = useSelector((state) => state.download);
    const { playing } = useSelector((state) => state.player);

    const matches = useMediaQuery(theme.breakpoints.down("xs"));

    const { loading, totalPages, currentPage, audioList, changePage } = useData({
        offlineMode,
        categoryId,
    });

    const handleChangePage = (_, page) => {
        changePage(page);
    };

    useEffect(() => {
        const categoryDetails = getCategoryById(categoryId);
        setCategoryDetails(categoryDetails);
    }, [categoryId]);

    const showPagination = !loading && audioList.length > 0 && totalPages > 1;

    useEffect(() => {
        window?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    return (
        <div style={playing ? { paddingBottom: 150 } : { paddingBottom: 50 }} className={classes.root}>
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        {[...new Set(JSON.parse(localStorage.getItem("allEntries")))].map((item) => {
                            return <ListItem currentPlayingPosition="category" key={item.id} data={item} />;
                        })}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
