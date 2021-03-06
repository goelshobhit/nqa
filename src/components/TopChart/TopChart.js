import { Box } from "@material-ui/core";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { changeURL } from "../../store/slices/playerSlice";
import Image from "../Image";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  image: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: 15,
    width: 150,
    height: 150,

    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
    },
  },

  title: {
    color: theme.palette.primary.dark,
  },

  item: {
    cursor: "pointer",
    width: 150,

    [theme.breakpoints.down("xs")]: {
      width: 100,
    },
  },
}));

export default function TopChart({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePlay = (item) => {
    dispatch(
      changeURL({
        name: item.name,
        link: item.link,
        id: item.id,
        image: item.image,
        categoryId: item.categoryId || item.category_id,
        currentPlayingPosition: "topChart",
      })
    );
  };

  return (
    <div className={classes.root}>
      <Box className={classes.title} mb={3} ml={1} fontSize="h4.fontSize" fontWeight="fontWeightBold">
        Most Popular
      </Box>
      <Swiper slidesPerView="auto" spaceBetween={40}>
        {data?.map((item) => (
          <SwiperSlide onClick={() => handlePlay(item)} className={classes.item} key={item.id}>
            <Box>
              <Image src={item.image} className={classes.image} />
            </Box>
            <Box textAlign="center" textOverflow="ellipsis" overflow="hidden" py={1} fontSize={12}>
              {item.name}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
