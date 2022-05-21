import { Box, Typography } from "@mui/material";
import styles from '../../styles/HomePage.module.css';

export default function BrandList () {
    return (
        <div mt='5' mb='4' className={styles.main}>
            <Typography textAlign={'center'} variant={'h4'}>
                Our Brand
            </Typography>

            <Box 
                display={'flex'} 
                justifyContent={'center'} 
                mt={2} mb={2}
                overflow={'hidden'}
            >
                <div className={styles.Slider}>
                    <div className={styles.Track}>
                        {itemData.map((e, idx) => (
                            <div className={styles.slide} key={idx}>
                                <img 
                                    src={e} alt={e}
                                    height={'300px'}
                                    style={{
                                        backgroundColor: 'white', 
                                        gap: '20px',
                                        height: 100,
                                        justifyContent: 'center'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Box>
        </div>
    )
}


const itemData = [
    'https://cdn.discordapp.com/attachments/960564590574456852/977581270596976730/Audi_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271020634132/Bentley_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271330992169/Ferrari_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271645552791/Jaguar_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272023044116/Lamborghini_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272450871326/Mercedes_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272744480828/Porsche_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581273180700742/Alpha_Rome_Logo.png',
    
    'https://cdn.discordapp.com/attachments/960564590574456852/977581270596976730/Audi_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271020634132/Bentley_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271330992169/Ferrari_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581271645552791/Jaguar_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272023044116/Lamborghini_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272450871326/Mercedes_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581272744480828/Porsche_Logo.png',
    'https://cdn.discordapp.com/attachments/960564590574456852/977581273180700742/Alpha_Rome_Logo.png',
]