import React, { useState } from "react";
import { View, Image, Text, Linking, AsyncStorage } from "react-native";

import styles from "./styles";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favored: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favored }) => {
  const [isFavored, setIsFavored] = useState(favored);

  function handleLinkToWhatsapp() {
    api.post("connections", { user_id: teacher.id });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesList = [];

    if (favorites) {
      favoritesList = JSON.parse(favorites);
    }

    if (isFavored) {
      const favoriteItem = favoritesList.findIndex(
        (teacherItem: Teacher) => teacherItem.id === teacher.id
      );

      favoritesList.splice(favoriteItem, 1);

      setIsFavored(false);
    } else {
      favoritesList.push(teacher);

      setIsFavored(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesList));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{}} style={styles.avatar} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <View style={styles.bio}>
        <Text>{teacher.bio}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavored ? styles.favored : {}]}
          >
            {isFavored ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
