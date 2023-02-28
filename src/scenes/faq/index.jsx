import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import {useSelector} from "react-redux";

const FAQ = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const languageSelector= useSelector(state => state.isEnglish)

   return (
       <Box m="20px">
          <Header title="FAQ" subtitle={languageSelector.bool ? "Frequently Asked Questions Page" : "Сторінка поширених запитань"} />

          <Accordion defaultExpanded>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                   {languageSelector.current.faqFirstQuestion}
                </Typography>
             </AccordionSummary>
             <AccordionDetails>
                <Typography>
                   {languageSelector.current.faqFirstAnswer}
                </Typography>
             </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                   {languageSelector.current.faqSecondQuestion}
                </Typography>
             </AccordionSummary>
             <AccordionDetails>
                <Typography>
                   {languageSelector.current.faqSecondQuestion}
                </Typography>
             </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                   {languageSelector.current.faqThirdQuestion}
                </Typography>
             </AccordionSummary>
             <AccordionDetails>
                <Typography>
                   {languageSelector.current.faqThirdQuestion}
                </Typography>
             </AccordionDetails>
          </Accordion>
       </Box>
   );
};

export default FAQ;